import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { PagesProvider, Page, SLIDES_CAPACITY } from '../../providers/pages/pages';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('slides') slides: Slides;

	private initPageIndex: number;
	private initSlideIndex = 0;

	private pages:Page[] = [];

	constructor(public navCtrl: NavController, private pagesProvider: PagesProvider) {
		this.initPageIndex = 17; // TODO: read from storage
		this.pages = pagesProvider.batchPullPages(this.initPageIndex);
		this.initSlideIndex = this.pages.length - 1;
	}

	ionViewDidEnter() {
		this.slides.slideTo(this.initSlideIndex, 0, false);
	}

	ionSlideDidChange() {

		if (this.slides.isEnd()) {
			this.onSlideDidChangeToLast();
		}
		else if (this.slides.isBeginning()) {
			this.onSlideDidChangeToFirst();
		}
	}

	onSlideDidChangeToLast() {

		if (!this.pagesProvider.needPagination()) {
			return;
		}

		let slideIndex = this.slides.getActiveIndex();
		if (slideIndex >= this.pages.length) {
			slideIndex = this.pages.length - 1;
		}
		let pageIndex = this.pages[slideIndex].index;

		this.pages = this.pagesProvider.batchPullPages(pageIndex);
		this.slides.update();

		let slideKeepIndex = Math.floor(SLIDES_CAPACITY / 2);
		this.slides.slideTo(slideKeepIndex, 0, false);
	}

	onSlideDidChangeToFirst() {

		if (!this.pagesProvider.needPagination()) {
			return;
		}

		let slideIndex = this.slides.getActiveIndex();
		let pageIndex = this.pages[slideIndex].index;

		this.pages = this.pagesProvider.batchPullPages(pageIndex);
		this.slides.update();

		let slideKeepIndex: number;
		if (this.pages.length < SLIDES_CAPACITY) {
			slideKeepIndex = Math.floor(SLIDES_CAPACITY / 2) - (SLIDES_CAPACITY - this.pages.length)
		}
		else {
			slideKeepIndex = Math.floor(SLIDES_CAPACITY / 2);
		}

		this.slides.slideTo(slideKeepIndex, 0, false);
	}
}









