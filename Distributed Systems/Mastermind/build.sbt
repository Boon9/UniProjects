name := "Mastermind"
version := "1.0"

val AkkaVersion = "2.6.10"
ThisBuild / scalaVersion := "2.12.15"

lazy val root = (project in file("."))
  .settings(
    name := "Mastermind",
    resolvers += ("custome1" at "http://4thline.org/m2").withAllowInsecureProtocol(true),
    addCompilerPlugin("org.scalamacros" % "paradise" % "2.1.1" cross CrossVersion.full),
      libraryDependencies ++= Seq(
      "org.scalafx" %% "scalafxml-core-sfx8" % "0.5",
      "org.scalafx" %% "scalafx" % "8.0.192-R14",
      "com.typesafe.akka" %% "akka-actor-typed" % AkkaVersion,
      "com.typesafe.akka" %% "akka-remote" % AkkaVersion,
      "com.typesafe.akka" %% "akka-cluster-typed" % AkkaVersion,
      "com.typesafe.akka" %% "akka-serialization-jackson" % AkkaVersion,
      "org.fourthline.cling" % "cling-core" % "2.1.2",
      "org.fourthline.cling" % "cling-support" % "2.1.2",
      "ch.qos.logback" % "logback-classic" % "1.2.3",
        "org.openjfx" % "javafx-media" % "11"
    )


  )

fork := true
