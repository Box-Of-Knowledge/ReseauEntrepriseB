#!/bin/bash
# CPU
top -b -n 1 | grep Cpu > cpu.tmp
IDLEMEM=$(awk '{print $8}' cpu.tmp | head -c 2)
FULLCPU=100
USEDCPU=$(($FULLCPU-$IDLEMEM))

# MEMORY
top -b -n 1 | grep Mem | head -n 1 > mem.tmp
USEDMEM=$(awk '{print $8}' mem.tmp | cut -d '.' -f1) 
TOTALMEM=$(awk '{print $4}' mem.tmp | cut -d '.' -f1)
USEDMEMPERCENTAGE=$(($USEDMEM * 100 / $TOTALMEM ))

# SWAP
top -b -n 1 | grep Mem | tail -n 1 > swap.tmp
USEDSWAP=$(awk '{print $7}' swap.tmp | cut -d '.' -f1) 
TOTALSWAP=$(awk '{print $3}' swap.tmp | cut -d '.' -f1)
USEDSWAPPERCENTAGE=$(($USEDSWAP * 100 / $TOTALSWAP ))

# CLEAN UP
rm cpu.tmp mem.tmp swap.tmp

# DISPLAY
CPUUSAGETHRESHOLD=90
MEMUSAGETHRESHOLD=90
SWAPUSAGETHRESHOLD=90
echo "[$(date)] Cpu%: $USEDCPU Mem%: $USEDMEMPERCENTAGE Swap%: $USEDSWAPPERCENTAGE" >> ressources.log
if [ $USEDMEMPERCENTAGE -ge $MEMUSAGETHRESHOLD ] || [ $USEDCPU -ge $CPUUSAGETHRESHOLD ] || [ $USEDSWAP -ge $SWAPUSAGETHRESHOLD ]
then
    echo "[$(date)] Cpu%: $USEDCPU Mem%: $USEDMEMPERCENTAGE Swap%: $USEDSWAPPERCENTAGE" >> threshold.log
fi

# ARCHIVAGE
LOGLINELIMIT=10000
LOGLINECOUNT=$(wc -l ressources.log | cut -d ' ' -f 1)
if [ $LOGLINECOUNT -ge $LOGLINELIMIT ]
then
    echo "log rotation"
    mv ressources.log ressources.old
fi