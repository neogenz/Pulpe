class ProgramController {
  constructor() {

  }

  findProgram(req, res){
    res.send('je suis un programme');
  }
}

module.exports = new ProgramController();