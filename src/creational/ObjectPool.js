export class PooledObject {

	constructor(id) {
		this.id = id;
		this.clear();
	}

	getContext() {
		return {
			url: this.url,
			method: this.method,
		}
	}

	clear() {
		this.url = null;
		this.method = null;
		return this;
	}
}


export const ObjectPool = {

	EXP_TIME : 6000,

	available : {},

	inUse : {},

	getObject() {
		const now = this.getTime();

		const availableObjects = Object.keys(this.available);
		if (availableObjects.length > 0) {
			for (let key of availableObjects) {
				const pooledObject = this.available[key];

				if (now - key > this.EXP_TIME) {
					//object has expired
					this.pop(this.available, key);
				} else {
					const po = this.pop(this.available, key);
					po.id = now;
					this.push(this.inUse, po, now);
					return po;
				}
			}
		}

		return this.createPooledObject(now);
	},

	createPooledObject(key) {
		const po = new PooledObject(key);
		this.inUse[key] = po;
		return po;
	},

	release(po){
		clean(po);
		this.available[this.getTime()] = po;
		return delete this.inUse[po.id];
	},

	clean(po) {
		return po.clear();
	},

	pop(target, key) {
		const obj = target[key];
		delete this.available[key];
		return obj;
	},

	getTime() {
		return new Date().getTime();
	}
}
