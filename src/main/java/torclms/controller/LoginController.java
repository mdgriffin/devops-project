package torclms.controller;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.composite.CompositeMeterRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;
import torclms.entity.UserRole;
import torclms.model.User;
import torclms.service.UserService;

import javax.validation.Valid;

@Controller
public class LoginController {
    CompositeMeterRegistry composite = new CompositeMeterRegistry();
    Counter loginRequestCounter = composite.counter("login.controller.login.counter");

    @GetMapping({"/", "/login"})
    public ModelAndView login(){
        loginRequestCounter.increment();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }

}
