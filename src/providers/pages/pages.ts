import { Injectable } from '@angular/core';

export const SLIDES_CAPACITY = 5; // 5/7/9/...

export class Page {
	constructor(public index: number, public url: string) {
	}
}

@Injectable()
export class PagesProvider {

	private pages: Page[] = [];

	constructor() {
		for (let i = 0; i < 18; i++) {
			let page = new Page(i, `http://myhonglou.com/honglou/bb/jmb/jmbimage/1-10/2/${19 + (17 - i)}.gif`);
			this.pages.push(page);
		}
	}

	pagesCount(): number {
		return this.pages.length;
	}

	needPagination(): boolean {
		return this.pagesCount() > SLIDES_CAPACITY;
	}

	batchPullPages(currentPage: number): Page[] {

		if (currentPage < 0 || currentPage >= this.pagesCount()) {
			return [];
		}

		if (!this.needPagination()) {
			return this.pages;
		}

		let halfBatch = Math.floor(SLIDES_CAPACITY / 2);
		let result: Page[] = [];

		for (let i = halfBatch; i > 0; i--) {

			let targetIndex = currentPage - i;

			if (targetIndex < 0) {
				continue;
			}

			result.push(this.pages[targetIndex]);
		}

		result.push(this.pages[currentPage]);

		for (let i = 1; i <= halfBatch; i++) {

			let targetIndex = currentPage + i;

			if (targetIndex >= this.pagesCount()) {
				break;
			}

			result.push(this.pages[targetIndex]);
		}

		return result;
	}
}
