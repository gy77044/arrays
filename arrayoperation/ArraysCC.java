import java.util.*;

public class ArraysCC {
  public static void main(String args[]) {
    int marks[] = new int[100];
    Scanner sc = new Scanner(System.in);

    marks[0] = sc.nextInt(); // Physics
    marks[1] = sc.nextInt(); // Chemistry
    marks[2] = sc.nextInt(); // Maths

    System.out.println("Physics :" + marks[0]);
    System.out.println("Chemisty :" + marks[1]);
    System.out.println("Maths :" + marks[2]);
  }
}