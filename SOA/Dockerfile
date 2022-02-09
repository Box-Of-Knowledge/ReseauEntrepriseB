FROM ubuntu:latest

RUN apt-get update && apt upgrade -y
RUN apt-get install bind9 -y 
RUN apt-get install bind9utils -y
RUN apt-get install dnsutils -y

COPY . .
RUN chmod +x ./script/generate_soa.sh

ARG DOMAIN_NAME
RUN ./script/generate_soa.sh $DOMAIN_NAME

CMD named -f

EXPOSE 53