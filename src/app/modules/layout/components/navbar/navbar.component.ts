import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faAngleDown,
  faBell,
  faClose,
  faInfoCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Colors, NAVBAR_BACKGROUNDS } from '@models/colors.model';

import { AuthService } from '@services/auth.service';
import { BoardsService } from '@services/boards.service';
import { MeService } from '@services/me.service';

import { Board } from '@models/board.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;
  faUser = faUser;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;

  user$ = this.authService.user$;
  navBarBackgroundColor: Colors = 'sky';
  navBarColors = NAVBAR_BACKGROUNDS;

  boards: Board[] = [];

  constructor(
    private authService: AuthService,
    private boardsService: BoardsService,
    private router: Router,
    private meService: MeService
  ) {
    this.boardsService.backgroundColor$.subscribe((color) => {
      this.navBarBackgroundColor = color;
    });
  }

  ngOnInit() {
    this.getMeBoards();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  close(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }

  getMeBoards() {
    this.meService.getMeBoards().subscribe((boards) => {
      this.boards = boards;
    });
  }

  get colors() {
    const classes = this.navBarColors[this.navBarBackgroundColor];
    return classes ? classes : {};
  }
}
