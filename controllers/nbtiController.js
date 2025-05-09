const NbtiResult = require('../models/NbtiResult');
const questions = require('../data/questions');
const User = require('../models/User');

function calcNBIT(answers){
  const Scores = {
    SP:0,
    ID:0,
    CX:0,
    AT:0
  }

  for (const ans of answers) {
    const {id, value, type} = ans;

    if(type=="S"){
      Scores.SP+=(6-value);
    }else if(type=="P"){
      Scores.SP+=value;
    }else if(type=="I"){
      Scores.ID+=(6-value);
    }else if(type=="D"){
      Scores.ID+=value;
    }else if(type=="C"){
      Scores.CX+=(6-value);
    }else if(type=="X"){
      Scores.CX+=value;
    }else if(type=="A"){
      Scores.AT+=(6-value);
    }else if(type=="T"){
      Scores.AT+=value;
    }
  }

  let nbti_name="";
  let explain="";

  const nbti=(Scores.SP<=12 ? 'S' : 'P')+(Scores.ID<=12 ? 'I' : 'D') +(Scores.CX<=12 ? 'C' : 'X') +(Scores.AT<=12 ? 'A' : 'T')
  if(nbti == "SICA"){
    nbti_name = "고구마형"
    explain = "따뜻하고 감성적인 전통파, 조용히 자기 길을 감."
  }else if(nbti == "SICT"){
    nbti_name = "콩나물형"
    explain = "정 많은 마을 리더형, 모두와 함께 자라남."
  }else if(nbti == "SIXA"){
    nbti_name = "표고버섯형"
    explain = "그늘에서도 실험 정신 불타는 은둔형 실험러."
  }else if(nbti == "SIXT"){
    nbti_name = "케일형"
    explain = "지속가능·건강·혁신·팀워크 다 잡는 슈퍼푸드형."
  }else if(nbti == "SDCA"){
    nbti_name = "감자형"
    explain = "말 적고 분석 잘하는 현실 농부. 탄탄한 기본기."
  }else if(nbti == "SDCT"){
    nbti_name = "양배추형"
    explain = "레이어 많은 전략가. 친환경 농업의 설계자."
  }else if(nbti == "SDXA"){
    nbti_name = "브로콜리형"
    explain = "신기술에 관심 많은 혼자파. 기능성 농업 마니아."
  }else if(nbti == "SDXT"){
    nbti_name = "두유형"
    explain = "데이터로 움직이는 프로듀서. 협업도 기가 막힘."
  }else if(nbti == "PICA"){
    nbti_name = "옥수수형"
    explain = "감으로 뻥 뚫리는 장사 감각. 혼자서도 쭉쭉 성장."
  }else if(nbti == "PICT"){
    nbti_name = "딸기형"
    explain = "트렌디하고 귀엽게 협업하는 팀플러. 인기 갑."
  }else if(nbti == "PIXA"){
    nbti_name = "고추형"
    explain = "혼자서도 강렬한 존재감. 수익에 진심인 실험러."
  }else if(nbti == "PIXT"){
    nbti_name = "파프리카형"
    explain = "다채로운 재능! 신사업·팀워크까지 다 되는 인싸형."
  }else if(nbti == "PDCA"){
    nbti_name = "대파형"
    explain = "수익과 데이터에 진심인 묵묵한 솔로 파이터."
  }else if(nbti == "PDCT"){
    nbti_name = "마늘형"
    explain = "수출도 OK! 현장형 전략가. 알싸한 존재감."
  }else if(nbti == "PDXA"){
    nbti_name = "바질형"
    explain = "혼자 R&D 즐기는 유망 농스타트업 1인창업러."
  }else if(nbti == "PDXT"){
    nbti_name = "토마토형"
    explain = "팀과 함께 빠르게 움직이는 테크농업 CEO형."
  }

  res = {nbti, nbti_name, explain};
  return res;
}

// 🔹 역할별 질문 제공

exports.getInfo = async (req, res) => {
  const {role, crops}=req.body;
  const userId=req.user.id;
  if (!Array.isArray(crops)) {
    return res.status(400).json({ message: "crops는 문자열 배열이어야 합니다." });
  }
  try{
    await User.findByIdAndUpdate(userId, {
      role,
      crops
    });
    res.json({ message: '저장 완료' });
  }catch (err){
    console.error(err);
    res.status(500).json({ message: "실패" });
  }
};
exports.getQuestions = async (req, res) => {
  res.json(questions);
};

// 🔹 응답 제출 (GPT 없이 역할을 결과로 저장)
exports.submitAnswers = async (req, res) => {
    console.log('🔥 POST /nbti/submit 요청 도착:', req.body); 
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ message: 'answers가 필요합니다.' });
  }
  const result = calcNBIT(answers)
  try {

    await NbtiResult.findOneAndUpdate(
      { userId: req.user.id },
      { result },
      { upsert: true, new: true }
    );

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '결과 저장 중 오류 발생' });
  }
};

// 🔹 결과 조회
exports.getResult = async (req, res) => {
  const result = await NbtiResult.findOne({ userId: req.user.id });
  if (!result) return res.status(404).json({ message: '결과 없음' });
  res.json(result);
};
