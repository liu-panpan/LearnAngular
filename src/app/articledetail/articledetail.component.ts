import { Component, OnInit,Input ,HostBinding,
         trigger, transition, animate,
         style, state } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import { Location }     from '@angular/common';
import {BLOGS,Blog} from '../data/blog';
import {BlogService} from '../data/blog.service'

import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'article-detail',
	templateUrl: './articledetail.component.html',
	styleUrls:['./articledetail.component.css'],

	animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.6s ease-in')
      ]),
      transition(':leave', [
        animate('.3s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})

export class ArticledetailComponent implements OnInit {
	@HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }
	@Input() blog:Blog;
	constructor(
	  private bService: BlogService,
	  private aRoute: ActivatedRoute,
	  private router: Router,
	  private location: Location
	) {}

	ngOnInit() {
		let id=this.aRoute.params
		.switchMap((params: Params) =>this.bService.getSelectedBlog(+params['id']))
		.subscribe(x=>this.blog=x)
	 }
   doComment()
   {
      this.router.navigate(["comment",{id:this.blog.id,title:this.blog.title}],{relativeTo:this.aRoute})
   }
 
	 back()
	 {
		 this.location.back();
	 }
}