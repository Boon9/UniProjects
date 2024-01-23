package ch.makery.address

import akka.actor.TypedActor.context
import akka.actor.typed.ActorRef
import scalafx.application.Platform
import scalafx.collections.ObservableBuffer
import scalafxml.core.macros.sfxml
import scalafx.scene.text.Text
import scalafx.scene.control.{Alert, Button, ButtonType, Label, ListView, TableColumn, TableView}
import scalafx.scene.image.{Image, ImageView}
import scalafx.event.ActionEvent
import scalafx.beans.property.StringProperty
import scalafx.stage.Stage
import scalafxml.core.{FXMLLoader, NoDependencyResolver}

import java.util.concurrent.atomic.AtomicInteger
import scala.collection.mutable.ArrayBuffer




@sfxml
class LobbyController(
                       private val playerName: Text,
                       private val playerCharacter: ImageView,
                       private val listRooms: ListView[User],
                       private val roomsTable: TableView[RoomObservable],
                       private val idColumn: TableColumn[RoomObservable, String],
                       private val titleColumn: TableColumn[RoomObservable, String],
                       private val statusColumn: TableColumn[RoomObservable, String]
                     ){
  var rd = scala.util.Random
  val loopy01 = new Image(getClass.getResourceAsStream("images/loopy.png"))
  val loopy02 = new Image(getClass.getResourceAsStream("images/loopy02.png"))
  val loopy03 = new Image(getClass.getResourceAsStream("images/loopy03.png"))
  val loopy04 = new Image(getClass.getResourceAsStream("images/loopy04.png"))
  val loopy05 = new Image(getClass.getResourceAsStream("images/loopy05.png"))
  val loopy06 = new Image(getClass.getResourceAsStream("images/loopy06.png"))
  val loopy07 = new Image(getClass.getResourceAsStream("images/loopy07.png"))
  val loopy08 = new Image(getClass.getResourceAsStream("images/loopy08.png"))

  // display character that randomly choose
  val pcharacter = rd.nextInt(8)
  pcharacter match {
    case 0 => playerCharacter.setImage(loopy01)
    case 1 => playerCharacter.setImage(loopy02)
    case 2 => playerCharacter.setImage(loopy03)
    case 3 => playerCharacter.setImage(loopy04)
    case 4 => playerCharacter.setImage(loopy05)
    case 5 => playerCharacter.setImage(loopy06)
    case 6 => playerCharacter.setImage(loopy07)
    case 7 => playerCharacter.setImage(loopy08)
  }
  var dialogStage : Stage = null

  playerName.text = GlobalState.playerNames.last.name


  private val mainClientActor: ActorRef[MainClient.Command] = Main.getSystem


  private val roomIdGenerator = new AtomicInteger(1)

  initTableView()
  def initialize(): Unit = {
    RoomUpdatePublisher.setUpdateCallback(updateRoomsList)
    refreshView() // Optionally, refresh view on initialization
  }

  def refreshView(): Unit = {
    // Request the server for the latest room list
    mainClientActor ! MainClient.RequestRoomListUpdate
    // You can also add any other UI refresh logic here if needed
  }

  initialize()

  private def initTableView(): Unit = {
    idColumn.cellValueFactory = {
      _.value.idProperty
    }
    titleColumn.cellValueFactory = {
      _.value.ownerNameProperty
    }
    statusColumn.cellValueFactory = {
      _.value.statusProperty
    }
  }
  implicit def roomConverter(room:Room):RoomObservable={
    new RoomObservable(room)
  }
  def handleCreate(): Unit = {
    val roomId = f"Room${roomIdGenerator.getAndIncrement()}%03d"
    val playerName = GlobalState.playerNames.last
    val newRoom = Room(roomId, playerName.name, 1, List(MainClient.user.get))
    roomsTable.items.get.add(newRoom)
    GlobalState.currentRoomPlayerNames += playerName
    mainClientActor ! MainClient.CreateRoom(newRoom)
    Main.showView("WaitingRoom.fxml")
  }

  def handleJoin(): Unit = {
    val selectedRoom = roomsTable.getSelectionModel.getSelectedItem

    if (selectedRoom != null && selectedRoom.room.playerCount < 4) {
      val playerName = GlobalState.playerNames.last
      val updatedPlayerList = selectedRoom.room.players :+ playerName
      val updatedRoom = selectedRoom.room.copy(playerCount = selectedRoom.room.playerCount + 1, players = updatedPlayerList)
      val roomIndex = roomsTable.items.get.indexOf(selectedRoom)
      roomsTable.items.get.set(roomIndex, updatedRoom)
      GlobalState.currentRoomPlayerNames += playerName
      mainClientActor ! MainClient.JoinRoom(selectedRoom.room.id, playerName)
      Main.showView("WaitingRoom.fxml")
    } else {
      val alert = new Alert(Alert.AlertType.Error) {
        initOwner(dialogStage)
        title = "Invalid"
        headerText = "Not Valid Choice"
        contentText = "Select A Room/Room is Full"
      }.showAndWait()
    }
  }

  def handleRefresh(): Unit = {
    mainClientActor ! MainClient.Refresher
  }

  def updateRoomsList(rooms: List[Room]): Unit = {
    Platform.runLater {
      roomsTable.items = ObservableBuffer(rooms.map(x => new RoomObservable(x)))
    }
  }

}


