import { Component, Input } from '@angular/core';
import { UserDash } from '../../interfaces/user-dash';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    @Input()
    username: string = "<username>";
}
