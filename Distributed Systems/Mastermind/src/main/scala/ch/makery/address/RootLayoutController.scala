package ch.makery.address

import scalafxml.core.macros.sfxml 

@sfxml
class RootLayoutController() {
    //when player click on the exit button, the program will close
    def handleClose() {
        System.exit(0)
    }

    //when player click on the instructions button, the help window will appear
    def handleInstructions() {
        Main.showHelp("Help.fxml")
    }
}