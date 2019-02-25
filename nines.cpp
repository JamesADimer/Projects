/*
Author: James Dimer

This program gives the percentages of how many times the digit '9' appears for a given number.
Numbers provided are powers of 10.
*/
#include <stdio.h>
#include <iostream>
#include <iomanip>
#include <cstring>

using namespace std;

float nineCounter(int x, int y);
int speedyPower(int x, int p);	//function used in place of cmath::pow() to provide quicker compilation

int main()
{
    float nines[9];     //array that holds the number of nines
    float percentages[9];       //array that holds the percentage values
    nines[0] = nineCounter(speedyPower(10, 1), 9);      //hard coded initial value to avoid access errors in next step
    percentages[0] = nines[0]/speedyPower(10, 1)*100.0;
    cout << 1 << "    " << fixed << setprecision(1) << percentages[0] << "%\n";
    for (int i = 1; i < 9; i++)
    {
        nines[i] = nineCounter(speedyPower(10, i+1), speedyPower(10, i)) + nines[i-1];  //takes the amount of nines between the new and previous power of 10 and adds it to the previous amount
        percentages[i] = nines[i]/speedyPower(10, i+1)*100.0; //gets the percentage of nines in each value
        cout << i+1 << "    " << fixed << setprecision(1) << percentages[i] << "%\n"; //displays output
    }
    
    return 0;
}

float nineCounter(int x, int y)		//skipping unneccesary iterations was necessary for faster compilation
{
    float total = (float)x;
    float count = 0;
    for(int i = y; i < x; i++)
    {
        if (x <= 100)
        {
            string str = to_string(i);
            if(str.find("9") != str.npos)
            {
                count += 1;
            }
        }
        else if (x == speedyPower(10,3))
        {
            string str = to_string(i);
            if(str[0] == '9')
            {
                count += 100;
                break;
            }
            else if(str[1] == '9')
            {
                count += 10;
                i += 19;
            }
            else if (str[2] == '9')
            {
                count += 9;
                i += 81;
            }
        }
        else if (x == speedyPower(10,4))
        {
            string str = to_string(i);
            if(str[0] == '9')
            {
                count += 1000;
                break;
            }
            else if(str[1] == '9')
            {
                count += 100;
                i += 100;
            }
            else if(str[2] == '9')
            {
                count += 10;
                i += 19;
            }
            else if (str[3] == '9')
            {
                count += 9;
                i += 81;
            }
        }
        else if (x == speedyPower(10,5))
        {
            string str = to_string(i);
            if(str[0] == '9')
            {
                count += 10000;
                break;
            }
            else if(str[1] == '9')
            {
                count += 1000;
                i += 1000;
            }
            else if(str[2] == '9')
            {
                count += 100;
                i += 100;
            }
            else if(str[3] == '9')
            {
                count += 10;
                i += 19;
            }
            else if (str[4] == '9')
            {
                count += 9;
                i += 81;
            }
        }
        else if (x == speedyPower(10,6))
        {
            string str = to_string(i);
            if(str[0] == '9')
            {
                count += 100000;
                break;
            }
            else if(str[1] == '9')
            {
                count += 10000;
                i += 10000;
            }
            else if(str[2] == '9')
            {
                count += 1000;
                i += 1000;
            }
            else if(str[3] == '9')
            {
                count += 100;
                i += 100;
            }
            else if(str[4] == '9')
            {
                count += 10;
                i += 19;
            }
            else if (str[5] == '9')
            {
                count += 9;
                i += 81;
            }
        }
        else if (x == speedyPower(10,7))
        {
            string str = to_string(i);
            if(str[0] == '9')
            {
                count += 1000000;
                break;
            }
            else if(str[1] == '9')
            {
                count += 100000;
                i += 100000;
            }
            else if(str[2] == '9')
            {
                count += 10000;
                i += 10000;
            }
            else if(str[3] == '9')
            {
                count += 1000;
                i += 1000;
            }
            else if(str[4] == '9')
            {
                count += 100;
                i += 100;
            }
            else if(str[5] == '9')
            {
                count += 10;
                i += 19;
            }
            else if (str[6] == '9')
            {
                count += 9;
                i += 81;
            }
        }
        else if (x == speedyPower(10,8))
        {
            string str = to_string(i);
            if(str[0] == '9')
            {
                count += 10000000;
                break;
            }
            else if(str[1] == '9')
            {
                count += 1000000;
                i += 1000000;
            }
            else if(str[2] == '9')
            {
                count += 100000;
                i += 100000;
            }
            else if(str[3] == '9')
            {
                count += 10000;
                i += 10000;
            }
            else if(str[4] == '9')
            {
                count += 1000;
                i += 1000;
            }
            else if(str[5] == '9')
            {
                count += 100;
                i += 100;
            }
            else if(str[6] == '9')
            {
                count += 10;
                i += 19;
            }
            else if (str[7] == '9')
            {
                count += 9;
                i += 81;
            }
        }
        else if (x == speedyPower(10,9))
        {
            string str = to_string(i);
            if(str[0] == '9')
            {
                count += 100000000;
                break;
            }
            else if(str[1] == '9')
            {
                count += 10000000;
                i += 10000000;
            }
            else if(str[2] == '9')
            {
                count += 1000000;
                i += 1000000;
            }
            else if(str[3] == '9')
            {
                count += 100000;
                i += 100000;
            }
            else if(str[4] == '9')
            {
                count += 10000;
                i += 10000;
            }
            else if(str[5] == '9')
            {
                count += 1000;
                i += 1000;
            }
            else if(str[6] == '9')
            {
                count += 100;
                i += 100;
            }
            else if(str[7] == '9')
            {
                count += 10;
                i += 19;
            }
            else if (str[8] == '9')
            {
                count += 9;
                i += 81;
            }
        }
    }
    return (float)count;
}

int speedyPower(int x, int p)
{
    int output = 1;
    int temp;
    for (int i = 1; i <= p; i++)
    {
        temp = x;
        output *= temp;
    }
    return output;
}
