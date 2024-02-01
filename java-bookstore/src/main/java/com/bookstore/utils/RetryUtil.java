package com.bookstore.utils;


import java.lang.invoke.MethodHandles;
import java.util.concurrent.Callable;

import lombok.experimental.UtilityClass;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@UtilityClass
public class RetryUtil {
    public static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    public static <V> V invokeWithRetry(Callable<V> callable, long retryInterval, int maxRetryTimes,
                                        Class<? extends Exception>... retryExceptions) throws Exception {
        int retried = 0;
        Exception stack = null;
        do {
            if (retried > 0) {
                Thread.sleep(retryInterval);
            }
            try {
                return callable.call();
            } catch (Exception e) {
                Boolean exceptionTypeFound = false;
                if (retryExceptions == null || retryExceptions.length == 0) {
                    // just retry if no exception is specified
                    log.info((e.getMessage()));
                    if (stack != null) {
                        e.addSuppressed(stack);
                    }
                    stack = e;
                    retried++;
                } else {
                    // Exception is specified, only these exception will retry
                    for (Class<? extends Exception> retryException : retryExceptions) {
                        if (retryException.isInstance(e)) {
                            log.info((e.getMessage()));
                            if (stack != null) {
                                e.addSuppressed(stack);
                            }
                            stack = e;
                            retried++;
                            exceptionTypeFound = true;
                            break;
                        }
                    }
                    if (!exceptionTypeFound) {
                        throw e;
                    }
                }
            }
        } while (retried <= maxRetryTimes);
        throw stack;
    }

}
