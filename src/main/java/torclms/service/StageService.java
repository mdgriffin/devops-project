package torclms.service;

import torclms.model.Stage;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface StageService {

    Stage saveStage (Stage stage);

    Optional<Stage> getStageById (int stageId);

    Stage getLastStage (List<Stage> stages);

}
