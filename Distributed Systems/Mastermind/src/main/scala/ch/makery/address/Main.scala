package ch.makery.address

import akka.actor.typed.ActorSystem
import scalafx.application.JFXApp
import scalafx.application.JFXApp.PrimaryStage
import scalafx.scene.Scene
import scalafx.scene.image.Image
import scalafx.Includes._
import scalafxml.core.{FXMLLoader, FXMLView, NoDependencyResolver}
import javafx.{scene => jfxs}
import scalafx.stage.{Modality, Stage}
import ch.makery.address.model.{Board, Clues, Colour}
import scala.collection.mutable.ArrayBuffer

object Main extends JFXApp {
    //create colours
    val colour1 = new Colour("Red", "R")
    val colour2 = new Colour("Orange", "O")
    val colour3 = new Colour("Yellow", "Y")
    val colour4 = new Colour("Green", "G")
    val colour5 = new Colour("Blue", "B")
    val colour6 = new Colour("Pink", "P")

    //a list for the colours
    val colourList = List(colour1, colour2, colour3, colour4, colour5, colour6)

    //create clue types
    val clue1 = new Clues("C2 W0")
    val clue2 = new Clues("C3 W0")
    val clue3 = new Clues("C4 W0")
    val clue4 = new Clues("C1 W1")
    val clue5 = new Clues("C2 W1")
    val clue6 = new Clues("C3 W1")
    val clue7 = new Clues("C0 W2")
    val clue8 = new Clues("C1 W2")
    val clue9 = new Clues("C2 W2")
    val clue10 = new Clues("C0 W3")
    val clue11 = new Clues("C1 W3")
    val clue12 = new Clues("C0 W4")

    var gameController: GameController = _

    //a list for the clue types
    val clueTypeList = List(clue1, clue2, clue3, clue4, clue5, clue6, clue7, clue8, clue9, clue10, clue11, clue12)

    //a board for the list and clue types
    val board = new Board(colourList, clueTypeList)

    // transform path of RootLayout.fxml to URI for resource location.
    val rootLoader = new FXMLLoader(getClass.getResource("view/RootLayout.fxml"), NoDependencyResolver)
    // initialize the loader object.
    rootLoader.load()
    // retrieve the root component BorderPane from the FXML
    val roots = rootLoader.getRoot[jfxs.layout.BorderPane]
    // initialize stage
    stage = new PrimaryStage {
        title = "MASTERMIND"
        /*icons += new Image("file:resources/images/mastermind.jpg")*/
        icons += new Image(getClass.getResourceAsStream("images/mastermind.jpg"))
        scene = new Scene {
            root = roots
            stylesheets = List(getClass.getResource("view/DarkMode.css").toString())
        }
    }
    var currentView: String = ""

    //display the windows
//    def showView(v: String): Unit = {
//        val resource = getClass.getResource(s"view/${v}")
//        val loader = new FXMLLoader(resource, NoDependencyResolver)
//        loader.load()
//        val roots = loader.getRoot[jfxs.layout.AnchorPane]
//
//        if (v == "WaitingRoom.fxml") {
//            MainClient.userRef.foreach(_ ! MainClient.RequestRoomListUpdate)
//            val waitingRoomController = loader.getController[WaitingRoomController#Controller]
//            GlobalState.currentRoom.foreach(room => waitingRoomController.updatePlayerNames(room.players))
//        }
//        if (v == "Lobby.fxml") {
//            val lobbyController = loader.getController[LobbyController#Controller]
//            lobbyController.refreshView()
//        }
//        if (v == "Leaderboard.fxml") {
//            val leaderboardController = loader.getController[LeaderboardController#Controller]
//            GlobalState.leaderboardUpdateCallback = leaderboardController.updateLeaderboard
//            GlobalState.updateLeaderboard()
//        }
//
//        this.roots.center = roots
//    }
    def showView(v: String): Unit = {
        currentView=v
        val resource = getClass.getResource(s"view/${v}")
        val loader = new FXMLLoader(resource, NoDependencyResolver)
        loader.load()
        val roots = loader.getRoot[jfxs.layout.AnchorPane]
        v match {
            case "WaitingRoom.fxml" =>
                val waitingRoomController = loader.getController[WaitingRoomController#Controller]
                waitingRoomController.updateRoomView()

            case "Lobby.fxml" =>
                val lobbyController = loader.getController[LobbyController#Controller]
                lobbyController.refreshView()

            case "Leaderboard.fxml" =>
                val leaderboardController = loader.getController[LeaderboardController#Controller]
                GlobalState.leaderboardUpdateCallback = leaderboardController.updateLeaderboard
                leaderboardController.updateLeaderboard(GlobalState.playerRankings.toList)

            case _ => // For other views
        }

        this.roots.center = roots
    }

    //display main menu when start
    showView("MainMenu.fxml")

    //show help (instructions) in a new stage window
    def showHelp(v: String): Unit = {
        val resource = getClass.getResource(s"view/${v}")
        val loader = new FXMLLoader(resource, NoDependencyResolver)
        loader.load();
        val roots2 = loader.getRoot[jfxs.layout.AnchorPane]
        val control = loader.getController[HelpController#Controller]

        val dialog = new Stage() {
            initModality(Modality.APPLICATION_MODAL)
            initOwner(stage)
            icons += new Image(getClass.getResourceAsStream("images/mastermind.jpg"))
            scene = new Scene {
                root = roots2
            }
        }
        control.dialogStage = dialog
        dialog.showAndWait()
        control.okClicked
    }

    def showName() = {
        val resource = getClass.getResourceAsStream("view/Name.fxml")
        val loader = new FXMLLoader(null, NoDependencyResolver)
        loader.load(resource);
        val roots2 = loader.getRoot[jfxs.Parent]
        val control = loader.getController[NameController#Controller]

        // pop up new window
        val dialog = new Stage() {
            initModality(Modality.APPLICATION_MODAL)
            initOwner(stage)
            icons += new Image(getClass.getResourceAsStream("images/mastermind.jpg"))
            scene = new Scene {
                root = roots2
            }
        }
        control.dialogStage = dialog
        dialog.showAndWait()
        control.pnames
    }




    import MainClient._

    val greeterMain: ActorSystem[MainClient.Command] = ActorSystem(MainClient(), "GameSystem")
    // to start the finding of server actor
    greeterMain ! start

    def getSystem: ActorSystem[MainClient.Command] = greeterMain


    Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
        override def uncaughtException(t: Thread, e: Throwable): Unit = {
            // Handle exception, log it, show a user-friendly message, etc.
            e.printStackTrace()
        }
    })
}
