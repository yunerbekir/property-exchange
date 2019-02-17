using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Match
{
    class Person
    {
        private string firstName;
        private string lastName;
        private string currentNeighborhood;
        private double currentRent;
        private double currentSize;
        private string wantedNeighborhood;
        private double wantedRent;
        private double wantedSize;

        public Person()
        {
            firstName = "";
            lastName = "";
            currentNeighborhood = "";
            currentRent = 0;
            currentSize = 0;
            wantedNeighborhood = "";
            wantedRent = 0;
            wantedSize = 0;
        }

        public Person(string fName, string lName, string cNbh, double cRnt, double cSz, string wNbh, double wRnt, double wSz)
        {
            firstName = fName;
            lastName = lName;
            currentNeighborhood = cNbh;
            currentRent = cRnt;
            currentSize = cSz;
            wantedNeighborhood = wNbh;
            wantedRent = wRnt;
            wantedSize = wSz;
        }


        public string getName()
        {
            return firstName + " " + lastName;
        }

        public string getCurrentNbh()
        {
            return currentNeighborhood;
        }

        public double getCurrentR()
        {
            return currentRent;
        }

        public double getCurrentS()
        {
            return currentSize;
        }

        public string getWantedNbh()
        {
            return wantedNeighborhood;
        }

        public double getWantedR()
        {
            return wantedRent;
        }

        public double getWantedS()
        {
            return wantedSize;
        }
    }
}
