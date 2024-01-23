package ch.makery.address

import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior }
import scalafx.application.Platform
import akka.actor.typed.receptionist.Receptionist


object MainClient {
  sealed trait Command

  case object start extends Command

  case class UpdateRoomList(rooms: List[Room]) extends Command

  private case class ListingResponse(listing: Receptionist.Listing) extends Command

  final case object FindTheServer extends Command

  private var serverActorRef: Option[ActorRef[GameServer.Command]] = None

  final case class CreateRoom(room: Room) extends Command

  final case class JoinRoom(roomId: String, playerName: User) extends Command
  final case class StartGame(roomId: String, gameCode: String) extends Command

  var user : Option[User] = None

  var localRooms: List[Room] = List()

  var userRef : Option[ActorRef[MainClient.Command]] = None
  case class UpdateLeaderboard(rankings: List[PlayerRanking]) extends Command
//  case object NotifyLeaderboardUpdate extends Command
  case object RequestRoomListUpdate extends Command
  case class UpdateWaitingRoom(room: Room) extends Command
  case class InitiateGameStart(roomId: String) extends Command
  case object Refresher extends Command
  case class UpdateLeaderboardWithPlayer(playerRanking: PlayerRanking) extends Command
  case object SubscribeToLeaderboardUpdates extends Command
  case object ShowLeaderboard extends Command


  def apply(): Behavior[MainClient.Command] = Behaviors.setup { context =>

    val listingAdapter: ActorRef[Receptionist.Listing] =
      context.messageAdapter { listing =>
        println(s"listingAdapter:listing: ${listing.toString}")
        MainClient.ListingResponse(listing)
      }

    context.system.receptionist ! Receptionist.Subscribe(GameServer.ServerKey, listingAdapter)

    Behaviors.receiveMessage {
      case MainClient.start =>
        context.self ! FindTheServer
        userRef = Some(context.self)
        Behaviors.same

      case FindTheServer =>
        println(s"Client : got a FindTheServer message")
        context.system.receptionist !
          Receptionist.Find(GameServer.ServerKey, listingAdapter)
        Behaviors.same

      case ListingResponse(GameServer.ServerKey.Listing(listings)) =>
        listings.headOption match {
          case Some(serverRef) =>
            println("Server found: " + serverRef)
            serverActorRef = Some(serverRef)
          case None =>
            println("Server not found")
        }
        Behaviors.same

      case CreateRoom(room) =>
        println(User(user.get.name,context.self))
        if (user.nonEmpty){
          serverActorRef.foreach(_ ! GameServer.CreateRoom(room,User(user.get.name,context.self)))
          context.self ! MainClient.RequestRoomListUpdate
        }
        Behaviors.same

      case JoinRoom(roomId, playerName) =>
        println("joining room of id : " + roomId)
        serverActorRef.foreach(_ ! GameServer.JoinRoom(roomId, playerName))
        context.self ! MainClient.RequestRoomListUpdate
        Behaviors.same

      case UpdateRoomList(rooms) =>
        Platform.runLater {
          GlobalState.currentRoom = rooms.find(_.id == GlobalState.currentRoom.map(_.id).getOrElse(""))
          GlobalState.currentRoom.foreach(room => GlobalState.currentRoomPlayerNames ++= room.players)
          RoomUpdatePublisher.publish(rooms)
        }
        Behaviors.same

      case StartGame(roomId, gameCode) =>
        Platform.runLater {
          GlobalState.currentGameCode = gameCode // Use the received game code
          Main.showView("Game.fxml") // Transition to the game view
        }
        println(s"Starting Game for room $roomId with code: $gameCode")
        Behaviors.same

//      case NotifyLeaderboardUpdate =>
//        serverActorRef.foreach(_ ! GameServer.UpdateLeaderboard(GlobalState.playerRankings.toList))
//        Behaviors.same

      case RequestRoomListUpdate =>
        serverActorRef.foreach(_ ! GameServer.RequestRoomList(context.self))
        Behaviors.same

      case UpdateWaitingRoom(updatedRoom) =>
        Platform.runLater {
          GlobalState.currentRoom = Some(updatedRoom)
          if (Main.currentView == "WaitingRoom.fxml") {
            Main.showView("WaitingRoom.fxml")
          }
        }
        Behaviors.same

      case InitiateGameStart(roomId) =>
        serverActorRef.foreach(_ ! GameServer.StartGame(roomId))
        Behaviors.same

      case Refresher =>
        serverActorRef.foreach(_ ! GameServer.RequestRoomList(context.self))
        Behaviors.same

      case UpdateLeaderboardWithPlayer(playerRanking) =>
        serverActorRef.foreach(_ ! GameServer.UpdateLeaderboardWithPlayer(playerRanking))
        Behaviors.same

      case SubscribeToLeaderboardUpdates =>
        serverActorRef.foreach(_ ! GameServer.SubscribeForLeaderboardUpdates(context.self))
        Behaviors.same

      case UpdateLeaderboard(rankings) =>
        Platform.runLater {
          println("Debug Log " + rankings)
          GlobalState.playerRankings.clear()
          GlobalState.playerRankings ++= rankings
          GlobalState.updateLeaderboard(rankings)
          Main.showView("Leaderboard.fxml")
        }
        Behaviors.same

      case ShowLeaderboard =>
        Platform.runLater {
          Main.showView("Leaderboard.fxml")
        }
        Behaviors.same
    }
  }
}