#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <unistd.h>

#define MAX_BUF 1024

char* stop = "arrete";
char * base = "/tmp/myfifo";
int main(int argc, char *argv[])
{
    int arret = 0;

    while (arret == 0)
    {

        int fd;
        char * myfifo = argv[1];
        char buf[MAX_BUF];

        fd = open(myfifo, O_RDONLY);
        read(fd, buf, MAX_BUF);
        if (strcmp (buf, stop) == 0) arret = 1;
        printf("Received: %s\n", buf);
        close(fd);
    }

    return 0;
}