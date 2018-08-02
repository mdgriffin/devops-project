package torclms.service;

import torclms.entity.UserRole;
import torclms.model.Course;
import torclms.model.Stage;
import torclms.model.User;
import torclms.model.UserAssignment;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User findUserByEmail(String email);

    void saveUser(User user, UserRole userRole);

    Optional<User> findById (Long userId);

    User assignCourse(User user, Course course);

    List<User> findUsersWithLockedAssignments ();

    List<UserAssignment> findAssignmentsByUserId (Long userId);

    List<UserAssignment> findUserAssignmentsByCourseId (Long userId, int courseId);

}