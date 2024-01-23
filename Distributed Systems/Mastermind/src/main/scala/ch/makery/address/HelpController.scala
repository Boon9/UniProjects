package ch.makery.address

import scalafxml.core.macros.sfxml
import scalafx.Includes._
import scalafx.stage.Stage

@sfxml
class HelpController() {
    var dialogStage : Stage = null
    var okClicked = false

    def handleBack() {
        okClicked = true;
        dialogStage.close()    
}
}