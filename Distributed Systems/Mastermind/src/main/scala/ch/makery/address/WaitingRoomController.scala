package ch.makery.address

import scalafx.application.Platform
import scalafx.scene.text.Text
import scalafx.stage.Stage
import scalafxml.core.macros.sfxml




@sfxml
class WaitingRoomController(
                             private val playerOneName: Text,
                             private val playerTwoName: Text,
                             private val playerThreeName: Text,
                             private val playerFourName: Text,
                           ) {
  var dialogStage : Stage = null


  def handleBack(): Unit = {
    // Go back to the lobby
    Main.showView("Lobby.fxml")
  }

//  def handleStart(): Unit = {
//    println("Start button clicked")
//    Main.greeterMain ! MainClient.InitiateGameStart
//  }

  def handleStart(): Unit = {
    println("Start button clicked")
    GlobalState.currentRoom.foreach { room =>
      MainClient.userRef.foreach { userRef =>
        userRef ! MainClient.InitiateGameStart(room.id)
      }
    }
  }

  def updatePlayerNames(): Unit = {
    Platform.runLater {
      val playerNames = GlobalState.currentRoom.map(_.players.map(_.name)).getOrElse(List())
      //this is where ArrayBuffer(User(sss,Actor[akka://GameSystem/user#0])) List() is coming from

      // Set the player names in the UI
      playerOneName.text = playerNames.lift(0).getOrElse("")
      playerTwoName.text = playerNames.lift(1).getOrElse("")
      playerThreeName.text = playerNames.lift(2).getOrElse("")
      playerFourName.text = playerNames.lift(3).getOrElse("")
      println(GlobalState.currentRoomPlayerNames + " " + playerNames)
      playerToNumber()
    }
  }

  def updateRoomView(): Unit = {
    updatePlayerNames()
  }


  def playerToNumber(): Unit = {
    GlobalState.playerOne = playerOneName.text.value
    GlobalState.playerTwo = playerTwoName.text.value
    GlobalState.playerThree = playerThreeName.text.value
    GlobalState.playerFour = playerFourName.text.value
  }

}
