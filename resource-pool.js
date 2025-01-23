class ResourcePool {
  creatorFunc() {}
  resetFunc() {}
  limit = 10;
  pool = [];
  constructor(creatorFunc, resetFunc, limit = 10) {
    this.creatorFunc = creatorFunc;
    this.resetFunc = resetFunc;
    this.limit = limit;
    this.pool = [];
    this.activeResources = 0;
  }

  acquireResource() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    } else if (this.activeResources < this.limit) {
      this.activeResources++;
      return this.creatorFunc();
    } else {
      throw new Error("No resources availale and limit breached");
    }
  }

  releaseResource(resource) {
    if (this.pool.length < this.limit) {
      this.pool.push(resource);
    } else {
      throw new Error("Pool is full. Cannot release more resources.");
    }
  }

  clearAll(destroy) {
    if (destroy) {
      this.pool.forEach((resource) => destroy(resource));
    }
    this.pool = [];
    this.acquireResource = 0;
  }
}
