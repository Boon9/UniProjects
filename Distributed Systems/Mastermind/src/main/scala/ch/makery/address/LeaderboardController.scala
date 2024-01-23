package ch.makery.address

import akka.actor.typed.ActorRef
import scalafx.Includes._
import scalafx.application.Platform
import scalafx.scene.control.{Button, TableColumn, TableView}
import scalafx.collections.ObservableBuffer
import scalafxml.core.macros.sfxml
import scalafx.beans.property.StringProperty



@sfxml
class LeaderboardController(
                             private val rankColumn: TableColumn[PlayerRankingViewModel, String],
                             private val playerColumn: TableColumn[PlayerRankingViewModel, String],
                             private val triesColumn: TableColumn[PlayerRankingViewModel, String],
                             private val leaderboardTable: TableView[PlayerRankingViewModel],
                             private val okButton: Button
                           ) {
  // Sample data for the leaderboard
  private val data = ObservableBuffer[PlayerRankingViewModel]()
  private val mainClientActor: ActorRef[MainClient.Command] = Main.getSystem

  def initialize(): Unit = {
    rankColumn.cellValueFactory = _.value.rankProperty
    playerColumn.cellValueFactory = _.value.playerProperty
    triesColumn.cellValueFactory = _.value.triesProperty
    leaderboardTable.items = data


    refreshLeaderboard(GlobalState.playerRankings.toList)
    println(leaderboardTable + " leaderboard table values ")
  }

  initialize()
  def updateLeaderboard(rankings: List[PlayerRanking]): Unit = {
    println("Updating leaderboard with: " + rankings)
    val viewModels = rankings.map(new PlayerRankingViewModel(_))
    println(viewModels + " viewModel  values ")
    data.clear()
    data ++= viewModels
    leaderboardTable.refresh()
  }


  def refreshLeaderboard(rankings: List[PlayerRanking] = GlobalState.playerRankings.toList): Unit = {
    Platform.runLater {
      updateLeaderboard(rankings)
    }
  }


  // Event handler for the OK button
  def handleOk(): Unit = {
    // Navigate back to MainMenu.fxml when OK is clicked
    Main.showView("MainMenu.fxml")
  }

  def handleRefresh(): Unit = {
    // Request the server for the latest leaderboard
    mainClientActor ! MainClient.SubscribeToLeaderboardUpdates
  }
}
