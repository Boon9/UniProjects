package ch.makery.address

import akka.actor.typed.ActorRef
import akka.actor.typed.ActorSystem
import akka.actor.typed.Behavior
import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.receptionist.{Receptionist, ServiceKey}
import com.hep88.Upnp
import com.hep88.Upnp.AddPortMapping
import scalafx.collections.ObservableHashSet
import com.hep88.MyConfiguration

import java.util.concurrent.atomic.AtomicInteger
import scala.collection.mutable.ListBuffer

case class User (name: String, ref: ActorRef[MainClient.Command])

object GameServer {
  sealed trait Command

  var rooms: List[Room] = List()

  private val roomIdGenerator = new AtomicInteger(1)

  case class ReceiveGuess(playerName: String, guess: String) extends Command

  val ServerKey: ServiceKey[GameServer.Command] = ServiceKey("Server")

  val members = new ObservableHashSet[User]()

  var leaderboardRankings: ListBuffer[PlayerRanking] = ListBuffer()
  var leaderboardSubscribers: List[ActorRef[MainClient.Command]] = List()

  case class StartGame(roomId: String) extends Command
  case class CreateRoom(room: Room,from : User) extends Command

  case class JoinRoom(roomId: String, playerName: User) extends Command
  case class RequestRoomList(replyTo: ActorRef[MainClient.Command]) extends Command
  case class BroadcastWaitingRoom(room: Room) extends Command
  case class UpdateLeaderboardWithPlayer(playerRanking: PlayerRanking) extends Command
  case class SubscribeForLeaderboardUpdates(replyTo: ActorRef[MainClient.Command]) extends Command

  def apply(): Behavior[GameServer.Command] = Behaviors.setup { context =>


    context.system.receptionist ! Receptionist.Register(ServerKey, context.self)


    Behaviors.receiveMessage { message =>
      message match{

        case CreateRoom(room, from) =>
          val newRoomId = generateRoomId() // Generate new Room ID
          val newRoom = room.copy(id = newRoomId, players = List(from)) // Initialize room with the creator
          rooms = rooms :+ newRoom
          members += from
          broadcastRoomUpdate()  // Update lobby view
          broadcastWaitingRoomUpdate(newRoomId)  // Update waiting room view
          Behaviors.same

        case JoinRoom(roomId, playerName) =>
          rooms.find(_.id == roomId).foreach { room =>
            if (room.playerCount < 4) {
              val updatedPlayers = room.players :+ playerName
              rooms = rooms.map { r =>
                if (r.id == roomId) r.copy(playerCount = r.playerCount + 1, players = updatedPlayers)
                else r
              }
              context.self ! BroadcastWaitingRoom(rooms.find(_.id == roomId).get)
            }
          }
          broadcastRoomUpdate()
          Behaviors.same

        case StartGame(roomId) =>
          rooms.find(_.id == roomId).foreach { room =>
            room.players.foreach(player => player.ref ! MainClient.StartGame(roomId, GlobalState.currentGameCode))
          }
          Behaviors.same

//        case UpdateLeaderboard(rankings) =>
//          broadcastLeaderboardUpdate(rankings)
//          Behaviors.same

        case RequestRoomList(replyTo) =>
          // Send the current list of rooms back to the client
          replyTo ! MainClient.UpdateRoomList(rooms)
          Behaviors.same

        case BroadcastWaitingRoom(room) =>
          room.players.foreach(player => player.ref ! MainClient.UpdateWaitingRoom(room))
          Behaviors.same

//        case UpdateLeaderboardWithPlayer(playerRanking: PlayerRanking) =>
//          updatePlayerRanking(playerRanking)
//          // Now broadcast the updated, sorted leaderboard to all subscribers
//          leaderboardSubscribers.foreach(_ ! MainClient.UpdateLeaderboard(leaderboardRankings.toList))
//          Behaviors.same

        case UpdateLeaderboardWithPlayer(playerRanking) =>
          updatePlayerRanking(playerRanking)
          // Broadcast the updated leaderboard to all clients
          broadcastLeaderboardUpdate(leaderboardRankings.toList)
          // Now, tell the specific client who won/lost to show the leaderboard
          playerRanking.ref ! MainClient.ShowLeaderboard
          Behaviors.same

        case SubscribeForLeaderboardUpdates(replyTo) =>
          leaderboardSubscribers ::= replyTo
          // Send the current sorted leaderboard to the new subscriber immediately
          replyTo ! MainClient.UpdateLeaderboard(leaderboardRankings.toList)
          Behaviors.same
      }

    }
  }

  private val thegamecode = generateGameCode()
  GlobalState.currentGameCode=thegamecode
  println(thegamecode)
  // Generate a new game code without duplicates
  private def generateGameCode(): String = {
    try {
      val colours = "ROYGBP"
      scala.util.Random.shuffle(colours.toList).distinct.take(4).mkString
    } catch {
      case e: Exception =>
        println("Error in generating game code: " + e.getMessage)
        "ROYG" // Fallback code
    }
  }
  private def generateRoomId(): String = f"Room${roomIdGenerator.getAndIncrement()}%03d"

  def updatePlayerRanking(playerRanking: PlayerRanking): Unit = {
    // Update the leaderboard with the new ranking
    leaderboardRankings = (leaderboardRankings.filterNot(_.player == playerRanking.player) :+ playerRanking)
      .sortBy(_.tries.toInt) // Sort by number of tries as integers
      .zipWithIndex // Add an index to each ranking
      .map { case (ranking, index) =>
        ranking.copy(rank = (index + 1).toString.padLeft(2, '0')) // Pad rank with leading zero
      }
  }

  implicit class StringOps(str: String) {
    def padLeft(length: Int, padChar: Char): String = {
      padChar.toString * (length - str.length) + str
    }
  }

  def broadcastRoomUpdate(): Unit = {
    val roomList = rooms // Directly use the list
    members.foreach { user =>
      println("The rooms are " + roomList)
      user.ref ! MainClient.UpdateRoomList(roomList)
    }
  }

//  def broadcastLeaderboardUpdate(rankings: List[PlayerRanking]): Unit = {
//    members.foreach { user =>
//      user.ref ! MainClient.UpdateLeaderboard(rankings)
//    }
//  }

  def broadcastLeaderboardUpdate(rankings: List[PlayerRanking]): Unit = {
    leaderboardSubscribers.foreach(_ ! MainClient.UpdateLeaderboard(rankings))
  }

  def broadcastWaitingRoomUpdate(roomId: String): Unit = {
    rooms.find(_.id == roomId).foreach { room =>
      room.players.foreach { player =>
        player.ref ! MainClient.UpdateWaitingRoom(room)
      }
    }
  }
}

object Server extends App {
  val system: ActorSystem[GameServer.Command] = ActorSystem(GameServer(), "GameSystem")
}


