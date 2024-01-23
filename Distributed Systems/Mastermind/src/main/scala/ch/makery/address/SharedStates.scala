package ch.makery.address

import akka.actor.typed.ActorRef
import scalafx.application.Platform
import scalafx.beans.property.StringProperty

import scala.collection.mutable.{ArrayBuffer, ListBuffer}

object RoomUpdatePublisher {
  private var updateCallback: List[Room] => Unit = _

  def setUpdateCallback(callback: List[Room] => Unit): Unit = {
    updateCallback = callback
  }

  def publish(rooms: List[Room]): Unit = {
    if (updateCallback != null) {
      updateCallback(rooms)
    }
  }
}
object GlobalState {
  var playerNames: ArrayBuffer[User] = ArrayBuffer()
  var currentRoomPlayerNames: ArrayBuffer[User] = ArrayBuffer() // New list for current room
  var currentRoom: Option[Room] = None
  var currentGameCode: String = ""
  var completedName: String = ""
  var completedTries: String = ""
  var leaderboardUpdateCallback: (List[PlayerRanking]) => Unit = _
  var playerRankings: ListBuffer[PlayerRanking] = ListBuffer()
  var playerOne: String = ""
  var playerTwo: String = ""
  var playerThree: String = ""
  var playerFour: String = ""




  def updateLeaderboard(rankings: List[PlayerRanking]): Unit = {
    playerRankings.clear()
    playerRankings ++= rankings
    if (leaderboardUpdateCallback != null) {
      leaderboardUpdateCallback(rankings)
    }
  }
}


case class Room(id: String, ownerName: String, playerCount: Int, players: List[User]) {

}

class RoomObservable(val room: Room) {
  val idProperty = StringProperty(room.id)
  val ownerNameProperty = StringProperty(room.ownerName)
  val statusProperty = StringProperty(s"${room.players.size}/4")
}



case class PlayerRanking(rank: String, player: String, tries: String, ref: ActorRef[MainClient.Command])
class PlayerRankingViewModel(ranking: PlayerRanking) {
  val rankProperty: StringProperty = StringProperty(ranking.rank)
  val playerProperty: StringProperty = StringProperty(ranking.player)
  val triesProperty: StringProperty = StringProperty(ranking.tries)
}