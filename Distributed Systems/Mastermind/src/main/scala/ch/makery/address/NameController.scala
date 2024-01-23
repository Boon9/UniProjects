package ch.makery.address

import akka.actor.typed.ActorRef
import scalafx.scene.control.{Alert, Label, TextField}
import scalafx.scene.text.Text
import scalafxml.core.macros.sfxml
import scalafx.stage.Stage
import scalafx.Includes._
import scalafx.event.ActionEvent

import scala.collection.mutable.ArrayBuffer

@sfxml
class NameController (private val playerNameField : TextField) {

    var dialogStage : Stage = null
    var pnames = ArrayBuffer[String]()
    var clientActor: ActorRef[MainClient.Command] = _

    def handleOk(action: ActionEvent): Unit = {
        val pname = playerNameField.text.value
        if (isInputFilled()) {
            GlobalState.playerNames.append(User(pname,MainClient.userRef.get))
            MainClient.user = Some(User(pname,MainClient.userRef.get))
            dialogStage.close()
        }
    }

    def handleCancel(action :ActionEvent) {
        if (nullChecking(playerNameField.text.value))
            pnames.append("Player")
        dialogStage.close()
    }

    def nullChecking (x : String) = x == null || x.length == 0

    def isInputFilled() : Boolean = {
        var error = ""

        if (nullChecking(playerNameField.text.value))
            error += "Please enter your name!\n"

        if (error.length() == 0) {
            return true;
        } else {
            val alert = new Alert(Alert.AlertType.Error){
                initOwner(dialogStage)
                title = "Invalid Field"
                headerText = "No Valid Name"
                contentText = error
            }.showAndWait()

            return false
        }
    }

}