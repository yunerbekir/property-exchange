using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Match
{
    class Program
    {

        static void Main(string[] args)
        {
            Person firstPerson = new Person("Andrej", "Ivanovski", "Skaptopara", 500, 100, "Gramada", 400, 80);
            Person secondPerson = new Person("Aleksandar", "Aleksov", "Gramada", 700, 110, "Skaptopara", 600, 120);


            if (firstPerson.getCurrentNbh() == secondPerson.getWantedNbh() && firstPerson.getWantedNbh() == secondPerson.getCurrentNbh())
            {
                Console.WriteLine("Matching neighborhoods!");
            }
            else if (firstPerson.getCurrentR() < secondPerson.getWantedR() && firstPerson.getWantedR() > secondPerson.getCurrentR())
            {
                Console.WriteLine("Matching rents!");
            }
            else if (firstPerson.getCurrentS() > secondPerson.getWantedS() && firstPerson.getWantedS() < secondPerson.getCurrentS())
            {
                Console.WriteLine("Matching appartment sizes!");
            }

            Console.ReadKey();

        }
    }
}
