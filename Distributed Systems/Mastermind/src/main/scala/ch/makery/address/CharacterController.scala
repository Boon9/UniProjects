package ch.makery.address

import scalafxml.core.macros.sfxml
import scalafx.scene.text.Text
import scalafx.scene.control.{Button, ButtonType, Label}
import scalafx.scene.image.{Image, ImageView}
import scalafx.event.ActionEvent

@sfxml
class CharacterController() {

    val pnames = Main.showName
    def handleCharacter(){
        Main.showView("Lobby.fxml")
    }
}