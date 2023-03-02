import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { BackendService } from "./backend.service";

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                {provide: BackendService, useValue: new BackendService()}
            ],
            imports: [
                RouterTestingModule
            ]

        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', (() => {
        expect(component).toBeTruthy();
    }));
    it('should have router-outlet HTML', () => {
        const routerOutlet = fixture.debugElement.query(By.css('router-outlet')).nativeElement;
        expect(routerOutlet).toBeDefined();
    });
});
