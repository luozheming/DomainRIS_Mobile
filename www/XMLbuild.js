$scope.buildXml = function(str) {

  $scope.report_date = new Date()
    .Format("yyyy-MM-dd hh:mm:ss");
  $scope.report_content = $scope.report_content_origin;
  if ($scope.detailItem.dest_hospital_name !== undefined
    && $scope.detailItem.dest_hospital_name !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<patient_hospital_value></patient_hospital_value>",
        "<patient_hospital_value>"
        + $scope.detailItem.dest_hospital_name
        + "</patient_hospital_value>")
  }
  if ($scope.detailItem.pat_id !== undefined
    && $scope.detailItem.pat_id !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<patient_pid_value></patient_pid_value>",
        "<patient_pid_value>"
        + $scope.detailItem.pat_id
        + "</patient_pid_value>")
  }
  if ($scope.detailItem.pat_name !== undefined
    && $scope.detailItem.pat_name !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<patient_name_value></patient_name_value>",
        "<patient_name_value>"
        + $scope.detailItem.pat_name
        + "</patient_name_value>")
  }
  if ($scope.detailItem.pat_sex !== undefined
    && $scope.detailItem.pat_sex !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<patient_sex_value></patient_sex_value>",
        "<patient_sex_value>"
        + $scope.detailItem.pat_sex
        + "</patient_sex_value>")
  }
  if ($scope.detailItem.pat_birth_str !== undefined
    && $scope.detailItem.pat_birth_str !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<patient_birthday_date></patient_birthday_date>",
        "<patient_birthday_date>"
        + $scope.detailItem.pat_birth_str
        + "</patient_birthday_date>")
  }
  if ($scope.detailItem.pat_age !== undefined
    && $scope.detailItem.pat_age !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<age_value></age_value>",
        "<age_value>"
        + $scope.detailItem.pat_age
        + "</age_value>")
  }
  if ($scope.detailItem.reqou_name !== undefined
    && $scope.detailItem.reqou_name !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<dept_no_value></dept_no_value>",
        "<dept_no_value>"
        + $scope.detailItem.reqou_name
        + "</dept_no_value>")
  }
  if ($scope.detailItem.clinical_symptoms !== undefined
    && $scope.detailItem.clinical_symptoms !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<symptom_value></symptom_value>",
        "<symptom_value>"
        + $scope.detailItem.clinical_symptoms
        + "</symptom_value>")
  }
  if ($scope.detailItem.clinical_diagnosis !== undefined
    && $scope.detailItem.clinical_diagnosis !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<diagnoses_value></diagnoses_value>",
        "<diagnoses_value>"
        + $scope.detailItem.clinical_diagnosis
        + "</diagnoses_value>")
  }
  if ($scope.detailItem.bodypart !== undefined
    && $scope.detailItem.bodypart !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<check_part_value></check_part_value>",
        "<check_part_value>"
        + $scope.detailItem.bodypart
        + "</check_part_value>")
  }
  if ($scope.image_symptoms !== undefined
    && $scope.image_symptoms !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<report_content_value></report_content_value>",
        "<report_content_value>"
        + $scope.image_symptoms
        + "</report_content_value>")
  }
  if ($scope.image_diagnosis !== undefined
    && $scope.image_diagnosis !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<report_conclusion_value></report_conclusion_value>",
        "<report_conclusion_value>"
        + $scope.image_diagnosis
        + "</report_conclusion_value>")
  }
  if ($scope.detailItem.reqdoc_name !== undefined
    && $scope.detailItem.reqdoc_name !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<exam_doctor_value></exam_doctor_value>",
        "<exam_doctor_value>"
        + $scope.detailItem.reqdoc_name
        + "</exam_doctor_value>")
  }
  if ($scope.currentUser.account.user_name !== undefined
    && $scope.currentUser.account.user_name !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<report_doctor_value></report_doctor_value>",
        "<report_doctor_value>"
        + $scope.currentUser.account.user_name
        + "</report_doctor_value>")
  }
  if ($scope.report_date !== undefined
    && $scope.report_date !== null) {
    $scope.report_content = $scope.report_content
      .replace(
        "<report_date_value></report_date_value>",
        "<report_date_value>"
        + $scope.report_date
        + "</report_date_value>")
  }
}
