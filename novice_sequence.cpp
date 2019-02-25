#include <stdio.h>
#include <iostream>

using namespace std;

int digitMultiplier(int x);
int sequenceGetter(int n, int k);

int main()
{
    int n = 1;
    int k = 1; 
    int result;
    while(n != 0 or k != 0)
    {
        cout << "Enter n and k: ";
        cin >> n >> k;
        result = sequenceGetter(n,k);
        if(n != 0 or k != 0)
        {
        printf("%u is item #%u in the sequence.\n\n", result, k);
        }
    }
    return 0;
}

int digitMultiplier(int x)
{
    int quotient = x;
    int product = 1;
    int digit;
    while (quotient > 0)
    {
        digit = quotient % 10;
        product = product * digit;
        quotient = quotient / 10;
    }
    return product;
}

int sequenceGetter(int n, int k)
{
    int start;
    int additive;
    int result = n;
    for(int i = 0; i < k; i++)
    {
        start = result;
        additive = digitMultiplier(start);
        result = start + additive;
    }
    return result;
}




