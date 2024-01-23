package ch.makery.address

import akka.actor.typed.ActorRef
import scalafxml.core.macros.sfxml
import scalafx.Includes._
import scalafx.application.Platform
import scalafx.scene.control.{Alert, Button, ButtonType, Label, ListView}
import scalafx.scene.control.Alert.AlertType
import scalafx.stage.Stage
import scalafx.collections.ObservableBuffer
import scalafx.scene.text.Text
import scalafx.scene.image.{Image, ImageView}
import javafx.scene.media.{Media, MediaPlayer}


@sfxml
class GameController(
                      private var playerName: Text,
                      private var playerCharacter: ImageView,
                      private val guess: Label,
                      private val board: ListView[String],
                      private val clues: ListView[String]
                    ) {

    var dialogStage : Stage = null
    var tries : Int = 0
    var boardList = new ObservableBuffer[String]()
    var cluesList = new ObservableBuffer[String]()



    //create a random main code with no duplicate colours
    var colour = (Main.board.colourList(0)).shortForm + (Main.board.colourList(1)).shortForm + (Main.board.colourList(2)).shortForm +
      (Main.board.colourList(3)).shortForm + (Main.board.colourList(4)).shortForm + (Main.board.colourList(5)).shortForm
    var code = ""
    for (i <- 0 to 3) {
        val index = (math.random * colour.length).toInt
        val letter = colour(index)
        colour = colour.substring(0,index) + colour.substring(index+1)
        code = code + letter
    }


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

    // display player's name
    playerName.text = GlobalState.playerNames.last.name

    private val mainClientActor: ActorRef[MainClient.Command] = Main.getSystem

    private var playerNameStr = GlobalState.playerNames.last.name

    //displays the short form of the colour when player clicks on the respective button
    def handleRed(): Unit = {
        guess.text = guess.text().toString + (Main.board.colourList(0)).shortForm
    }

    def handleOrange(): Unit = {
        guess.text = guess.text().toString + (Main.board.colourList(1)).shortForm
    }

    def handleYellow(): Unit = {
        guess.text = guess.text().toString + (Main.board.colourList(2)).shortForm
    }

    def handleGreen(): Unit = {
        guess.text = guess.text().toString + (Main.board.colourList(3)).shortForm
    }

    def handleBlue(): Unit = {
        guess.text = guess.text().toString + (Main.board.colourList(4)).shortForm
    }

    def handlePink(): Unit = {
        guess.text = guess.text().toString + (Main.board.colourList(5)).shortForm
    }

    //player click on the undo button to delete the colour one by one
    def handleUndo(): Unit = {
        if (guess.text().length() > 0) {
            guess.text = guess.text().substring(0, guess.text().length()-1)
        }
    }

    //player click on the clear button to delete the colour in one go
    def handleClear(): Unit = {
        if (guess.text().length() > 0) {
            guess.text = ""
        }
    }



    def processGuessResult(result: String): Unit = {
        Platform.runLater {
            if (result.startsWith("C4")) {
                win()
            } else if (tries == 9) {
                lose()
            } else {
                updateGuessResult(result)
            }
        }
    }
    def updateGuessResult(result: String): Unit = {
        // Use regular expression to extract correct and wrong counts
        result match {
            case _ =>

                Platform.runLater {
                    boardList += guess.text.value
                    cluesList += result
                    board.items = boardList
                    clues.items = cluesList
                }

        }
    }


    //show player's guess at the board listview
    board.items = boardList

    //player click on the ok button
    def handleOk(): Unit = {
        if (tries < 10 && isInputValid()) {
            val currentGuess = guess.text.value
            boardList += currentGuess // Add the current guess to the boardList

            val result = checkGuess(GlobalState.currentGameCode, currentGuess)
            updateGuessResult(result)
            tries += 1
            guess.text = ""
        }
    }
    //check answer by comparing main code with player's guess and create clues
    def checkGuess(code: String, guess: String): String = {
        var correct = 0
        var wrong = 0
        for (i <- 0 until 4) {
            if (code.charAt(i) == guess.charAt(i)) correct += 1
            else if (code.contains(guess.charAt(i))) wrong += 1
        }
        if (correct == 4) {
            win() // Trigger win if the guess is completely correct
            "C4W0" // Return this as a special case
        } else {
            s"C$correct W$wrong"
        }
    }
    //show clues at the clues listview
    clues.items = cluesList

    //check if player's input is correct
    def lengthChecking (x : String) = x == null || x.length != 4
    def isInputValid() : Boolean = {
        var errorMessage = ""
        val i=0

        //check for 4 colours
        if (lengthChecking(guess.text.value)) {
            errorMessage += "Please choose 4 colours!\n"
        }

        //check for duplicate colours
        if(guess.text.value(i) == guess.text.value(i+3)) {
            errorMessage += "No duplicate colours!\n"
        }

        for (i <- 0 until 2) {
            if(guess.text.value(i) == guess.text.value(i+2)) {
                errorMessage += "No duplicate colours!\n"
            }
        }

        for (i <- 0 until 3) {
            if(guess.text.value(i) == guess.text.value(i+1)) {
                errorMessage += "No duplicate colours!\n"
            }
        }

        if (errorMessage.length() == 0) {
            return true;
        } else {
            // Show the error message.
            val alert = new Alert(Alert.AlertType.Error){
                initOwner(dialogStage)
                title = "Invalid Input"
                headerText = "Please correct invalid input"
                contentText = errorMessage
            }.showAndWait()
            return false;
        }
    }

    //display message to player after winning, which displays the number of tries the player took
    def win(): Unit = {
        Platform.runLater {
            GlobalState.completedName = playerNameStr
            GlobalState.completedTries = tries.toString
            val alert = new Alert(AlertType.Information) {
                initOwner(dialogStage)
                title = "Game Over"
                headerText = "Congratulations! You Won!"
                contentText = s"You solved the game in $tries tries."
            }
            alert.showAndWait()

            val newRanking = PlayerRanking(
                rank = (GlobalState.playerRankings.size + 1).toString,
                player = playerNameStr,
                tries = tries.toString,
                ref = MainClient.userRef.getOrElse(throw new RuntimeException("User actor ref not found"))
            )

            mainClientActor ! MainClient.UpdateLeaderboardWithPlayer(newRanking)
        }
    }

    //display message to player after losing, which displays the correct answer
    def lose(): Unit = {
        Platform.runLater {
            GlobalState.completedName = playerNameStr
            GlobalState.completedTries = "Lost"
            val alert = new Alert(AlertType.Information) {
                initOwner(dialogStage)
                title = "Game Over"
                headerText = "You Lost"
                contentText = s"The correct answer was $code."
            }
            alert.showAndWait()

            val newRanking = PlayerRanking(
                rank = "DNF",
                player = playerNameStr,
                tries = "Lost",
                ref = MainClient.userRef.getOrElse(throw new RuntimeException("User actor ref not found"))
            )

            mainClientActor ! MainClient.UpdateLeaderboardWithPlayer(newRanking)
        }
    }

    def playBackgroundMusic(): Unit = {
        val musicFile = getClass.getResource("view/MainMenuBGM.mp3").toString
        val sound = new Media(musicFile)
        val mediaPlayer = new MediaPlayer(sound)
        mediaPlayer.setVolume(0.5)
        mediaPlayer.setCycleCount(MediaPlayer.INDEFINITE) // Loop the music
        mediaPlayer.play()
    }
    playBackgroundMusic()


}
