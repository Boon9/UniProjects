import java.io.{DataInputStream, DataOutputStream}
import java.net.Socket
import scala.io.StdIn

object Client extends App{
  val socket = new Socket ("localhost",5000)

  val dis = new DataInputStream(socket.getInputStream())
  val dout = new DataOutputStream(socket.getOutputStream())

  println("Enter ISBN:")
  val isbn = StdIn.readLine()
  dout.writeBytes(s"$isbn\n")

  val price = dis.readLine()
  println(s"Received from server: $price")

  socket.close()

}