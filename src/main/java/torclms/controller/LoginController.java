package torclms.controller;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {
    Counter loginRequestCounter;

    @Autowired
    public LoginController(final MeterRegistry registry) {
        this.loginRequestCounter = Counter.builder("login.controller.login.counter")
            .register(registry);
    }

    @GetMapping({"/", "/login"})
    public ModelAndView login(){
        loginRequestCounter.increment();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }

}
