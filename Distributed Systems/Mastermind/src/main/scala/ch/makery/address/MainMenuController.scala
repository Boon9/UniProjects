package ch.makery.address

import scalafxml.core.macros.sfxml 

@sfxml
class MainMenuController() {
    //when player click on the start button, will enter the game
    def handleStart() {
        Main.showView("Character.fxml")
    }

    //when player click on the quit button, the program will close
    def handleQuit() {
        System.exit(0)
    }

    //when player click on the help button, the instructions window will appear
    def handleHelp() {
        Main.showHelp("Help.fxml")
    }    
}