import java.io.*;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class main {

	public static void main(String[] args) {
		String logFilePath = "C:\\Users\\Krish\\.vscode\\445Labs\\LAB1_B\\log files\\throughput_log.log";
        String csvFilePath = "C:\\Users\\Krish\\.vscode\\445Labs\\LAB1_B\\log files\\throughput_log.csv";
        
        try (BufferedReader br = new BufferedReader(new FileReader(logFilePath));
                FileWriter writer = new FileWriter(csvFilePath)) {

               // Write headers to CSV file
               writer.append("ABR,Buffer Level(secs), Bitrate(Kbps), Measure Throughput(Kbps), Content Lenght(bytes), Download Time(milisecs)\n");

               String line;
               while ((line = br.readLine()) != null) {
                   
            	   String temp= null;
            	   if(line.startsWith("(index):136 -----")){
            		   continue; 
            	   }else {
            		   for(int i =0; i<5; i++) {
            			   String[] temp1 = br.readLine().split(":");
                		   String temp2 = temp1[2].trim();
                		   String[] tokens = temp2.split(" ");
                		   String info = tokens[0]; 
                		   temp= temp+","+info; 
                		   
            		   }
            		 writer.append(temp+"\n");
            		 
            	   }
            	   
//            	   if(line.startsWith("(index):130")) {
//            		   String[] temp1 = line.split(":");
//            		   strategy = temp1[2].trim();
//            	   }
//            	   if(line.startsWith("(index):131")) {
//            		   String[] temp2 = line.split(":");
//            		   buffer = temp2[2].trim();
//            	   }
//            	   if(line.startsWith("(index):132")) {
//            		   String[] temp3 = line.split(":");
//            		   bitrate = temp3[2].trim();
//            	   }
//            	   if(line.startsWith("(index):133")) {
//            		   String[] temp4 = line.split(":");
//            		   throughput = temp4[2].trim();
//            	   }
//            	   if(line.startsWith("(index):134")) {
//            		   String[] temp5 = line.split(":");
//            		   content_length = temp5[2].trim();
//            	   }
//            	   if(line.startsWith("(index):135")) {
//            		   String[] temp6 = line.split(":");
//            		   download = temp6[2].trim();
//            	   }
            	   
            	   // Parse log file line and extract relevant data
                   
                   // Write data to CSV file
                   //writer.append(strategy + "," + time + "," + message + "\n");
               }
           } catch (IOException e) {
               e.printStackTrace();
           }

	}

}
