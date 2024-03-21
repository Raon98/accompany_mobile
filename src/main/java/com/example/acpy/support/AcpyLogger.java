package com.example.acpy.support;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class AcpyLogger {
    private static final Logger LOGGER = LogManager.getLogger(AcpyLogger.class);
    private static String message;
    private static Object[] objArgs;

    public void log(String message) {
        LOGGER.info(message);
    }

    public static void info(String message) {
        LOGGER.info(message);
    }

    public static void info(String message, Object... objArg) {
        LOGGER.info(message, objArg);
    }

    public static void debug(String message) {
        LOGGER.debug(message);
    }

    public static void debug(String message, Object... objArg) {
        LOGGER.debug(message, objArg);
    }

    public static void error(String message) {
        LOGGER.error(message);
    }

    public static void error(String message, Object... objArg) {
        LOGGER.error(message, objArg);
    }
}
