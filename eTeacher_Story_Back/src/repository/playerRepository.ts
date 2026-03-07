




export class PlayerRepository {
  static repo(){
    return getRepository(Player);
  }

  static findById(id: string){
    return this.repo().findOne(id);
  }
}
