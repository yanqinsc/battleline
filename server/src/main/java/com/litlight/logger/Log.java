package com.litlight.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.log4j.PropertyConfigurator;

public class Log {
    public static void write(Class name) {
        PropertyConfigurator.configure("log4j.properties");
        Logger logger = LoggerFactory.getLogger(name);
        logger.info("hello world!");
    }

    public static void main(String[] args) {
        Log.write(Log.class);
    }
}
