package torclms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import torclms.dto.UserCourseAssignment;
import torclms.entity.TestCompletionDeadline;
import torclms.exception.ResourceNotFoundException;
import torclms.model.Course;
import torclms.model.User;
import torclms.repository.CourseRepository;
import torclms.service.CourseService;
import torclms.service.UserService;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseRepository courseRepo;

    @GetMapping("/courses")
    public List<Course> getCourse () {
        return courseService.findAll();
    }

    @PostMapping("/courses")
    public Course saveCourse (@RequestBody @Valid Course course) {
        return courseService.saveCourse(course);
    }

    // TODO: Change to /courses/assigned
    @PostMapping("/courses/assign")
    public User assignStage (@RequestBody UserCourseAssignment assignment) {
        Course course = courseService.findCourseById(assignment.getCourseId()).orElseThrow(() -> new ResourceNotFoundException("Course", "id", assignment.getCourseId()));
        User user = userService.findById(assignment.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User", "id", assignment.getUserId()));

        return userService.assignCourse(user, course);
    }

    @GetMapping("/courses/assigned/{userId}")
    public List<Course> getCoursesAssignedToUser (@PathVariable(value = "userId") Long userId) {
        List<Course> assignedCourses = courseRepo.findAssignedCourses(userId, new Date(), TestCompletionDeadline.getDate());

        if (assignedCourses.size() == 0) {
            throw new ResourceNotFoundException("User", "id", userId);
        }

        return assignedCourses;
    };
}
