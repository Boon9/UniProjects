import java.io.{BufferedReader, DataInputStream, DataOutputStream, FileReader}
import java.net.{ServerSocket, Socket}
import scala.collection.mutable
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

object Server extends App {

  val serverSocket = new ServerSocket(5000)
  val isbnPrices = new mutable.HashMap[String, String]()
  val br = new BufferedReader(new FileReader("ISBN.txt"))
  var line: String = br.readLine()
  while (line != null) {
    val parts = line.split(", ")
    isbnPrices.put(parts(2), parts(1)) // Assuming ISBN is the 3rd part and price is the 2nd
    line = br.readLine()
  }
  br.close()

  val clientSocket: Future[Socket] = Future{serverSocket.accept()}

  def processSocket (x: Socket): Unit = {

    val clientSocket2: Future[Socket] = Future{serverSocket.accept()}
    clientSocket2.foreach(x => {
      processSocket(x)
    })

    val dis = new DataInputStream(x.getInputStream())
    val dout = new DataOutputStream(x.getOutputStream())

    val isbn = dis.readLine()
    println(s"Received ISBN from Client = $isbn")

    val price = isbnPrices.getOrElse(isbn, "ISBN not found")
    dout.writeBytes(s"Price: $price\n")


    x.close()
  }


  clientSocket.foreach( x => {
    processSocket(x)
  })

  scala.io.StdIn.readLine("Press any key to quit \n")

  serverSocket.close()
}