#!/bin/bash
# CPU
top -b -n 1 | grep Cpu > cpu.tmp
IDLE=$(awk '{print $8}' cpu.tmp | head -c 2)
FULLCPU=100
USEDCPU=$(($FULLCPU-$IDLE))


# MEMORY
top -b -n 1 | grep Mem | head -n 1 > mem.tmp
USEDMEM=$(awk '{print $8}' mem.tmp | cut -d ',' -f1) 
TOTALMEM=$(awk '{print $4}' mem.tmp | cut -d ',' -f1)
USEDMEMPERCENTAGE=$(($USEDMEM * 100 / $TOTALMEM ))

# CLEAN

rm cpu.tmp mem.tmp

# DISPLAY
echo "---------------------------------------------" >> ressources.log
echo $(date) >> ressources.log
echo "CPU USAGE: $USEDCPU%" >> ressources.log
echo "MEMORY USAGE: $USEDMEMPERCENTAGE%" >> ressources.log


# ARCHIVAGE
LOGLIMIT=20000
LOGLENGTH=$(wc -l ressources.log | cut -d ' ' -f 1)
if [ $LOGLENGTH -ge $LOGLIMIT ]
then
    echo "ok"
    mv ressources.log ressources.log.old
fi