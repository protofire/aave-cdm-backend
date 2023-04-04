import mongoose from "mongoose";

export default class MongoDB {
  private connection?: typeof mongoose;
  readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  public async connect() {
    if (!this.connection) {
      this.connection = await mongoose.connect(this.url);
      if (this.connection.connections[0].readyState) {
        console.log("🚀 Connected to MongoDB at: http://0.0.0.0:27017");
      }
    }
  }

  public async closeConnection() {
    await mongoose.connection.close();
  }

  public getConnection(): typeof mongoose | undefined {
    return this.connection;
  }

  public async getDB() {}
}
