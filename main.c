#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <unistd.h>


#define MSGSIZE 16
char* msg1 = "test";
char* stop = "stop";
char* start = "start";

int main()
{

    
        

    int arret = 0;
    char line[1024];
    while (arret == 0)
    {
        memset(line, 0, 1024);
    

        scanf("%s", line);

        //fprintf(stderr, line);

        char inbuf[MSGSIZE];
        int p[2], i;

  
        if (strcmp (line, stop) == 0)
        {
            fprintf(stderr, "j'arrete les conneries\n");
            arret = 1;
        } 
         else 
        {
            if (strcmp (line, msg1) == 0) 
            {
                fprintf(stderr, "oui\n");
                arret = 0;
            }

            else 
            {
                if (strcmp (line, start) == 0) 
                {
                    char *args[]={"./pipe", "/tmp/myfifo",NULL};
                    fprintf(stderr, "j demarre la becanne\n");
                    execv(args[0], args);
                    // execvp
                }
                else 
                {   
                    fprintf(stderr, line);
                    fprintf(stderr, "\n");
                    fprintf(stderr, "hehehe c est pas juste\n");
                    
                    int fd;
                    char * myfifo = "/tmp/myfifo";
                    mkfifo(myfifo, 0666);
                    fd = open(myfifo, O_WRONLY);
                    write(fd, line, sizeof(line));
                    close(fd);
                    unlink(myfifo);
                    
                }
            }
        }
        
    }
    return 0;
}