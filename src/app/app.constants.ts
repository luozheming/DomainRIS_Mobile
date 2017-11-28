//这里配置全局变量
//以下是服务器的地址
let _DOMAINRIS_SERVER_ADDRESS = '';
// let _DOMAINRIS_SERVER_ADDRESS = 'http://192.168.4.184:8080';
let _AXVS_SERVER_ADDRESS = 'http://192.168.4.184:8080/axvs';
let _PatientXML:string = `<ReportInfo><PatientInfo><patient_hospital><patient_hospital_title>医院：</patient_hospital_title>
<patient_hospital_value></patient_hospital_value>
</patient_hospital>
<patient_pid>
<patient_pid_title>病人ID号：</patient_pid_title>
<patient_pid_value></patient_pid_value>
</patient_pid>
<patient_name>
<patient_name_title>姓名：</patient_name_title>
<patient_name_value></patient_name_value>
</patient_name>
<patient_sex>
<patient_sex_title>性别：</patient_sex_title>
<patient_sex_value></patient_sex_value>
</patient_sex>
<patient_birthday>
<patient_birthday_title>出生日期：</patient_birthday_title>
<patient_birthday_date></patient_birthday_date>
</patient_birthday>
<age>
<age_title>年龄：</age_title>
<age_value></age_value>
</age>
</PatientInfo>
<NumberInfo>
<dept_no>
  <dept_no_title>科别：</dept_no_title>
<dept_no_value></dept_no_value>
</dept_no>
</NumberInfo>
<PartInfo>
<symptom>
  <symptom_title>临床症状：</symptom_title>
<symptom_value></symptom_value>
</symptom>
<diagnoses>
<diagnoses_title>临床诊断：</diagnoses_title>
<diagnoses_value></diagnoses_value>
</diagnoses>
<check_part>
<check_part_title>扫描部位：</check_part_title>
<check_part_value></check_part_value>
</check_part>
</PartInfo>
<Content>
<report_content>
  <report_content_title>影像学表现：</report_content_title>
<report_content_value></report_content_value>
</report_content>
<report_conclusion>
<report_conclusion_title>诊断意见：</report_conclusion_title>
<report_conclusion_value></report_conclusion_value>
<report_comments_value></report_comments_value>
</report_conclusion>
<report_comments>
<report_comments_title>影像注释：</report_comments_title>
</report_comments>
<report_result>
<report_result_title>结论：</report_result_title>
<report_result_value></report_result_value>
</report_result>
<film_quality>
<film_quality_title>胶片质量：</film_quality_title>
<film_quality_value></film_quality_value>
</film_quality>
</Content>
<Doctor_Date>
<exam_doctor>
  <exam_doctor_title>检查医师：</exam_doctor_title>
<exam_doctor_value></exam_doctor_value>
</exam_doctor>
<report_doctor_no>
<report_doctor_no_title>报告医师工号：</report_doctor_no_title>
<report_doctor_no_value></report_doctor_no_value>
</report_doctor_no>
<report_doctor>
<report_doctor_title>报告医师：</report_doctor_title>
<report_doctor_value></report_doctor_value>
</report_doctor>
<report_date>
<report_date_title>报告日期：</report_date_title>
<report_date_value></report_date_value>
</report_date>
</Doctor_Date>
<Other>本报告仅供临床参考</Other>
<report_uid></report_uid>
</ReportInfo>`;
export const Patitentxml  = _PatientXML;
export const DOMAINRIS_SERVER_ADDRESS = _DOMAINRIS_SERVER_ADDRESS;
export const AXVS_SERVER_ADDRESS = _AXVS_SERVER_ADDRESS;
