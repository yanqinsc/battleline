import org.apache.log4j.PropertyConfigurator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public class Test {
    public static void main(String[] args) {
//        PropertyConfigurator.configure("log4j.properties");
        new Test().test();
    }

    public void test() {
        Logger log = LoggerFactory.getLogger(Test.class);
        log.info("hello, my name is {}", "chengyi");
    }
}
