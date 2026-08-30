import {Module} from "@nestjs/common"
import { UserAccessGuard } from "src/common/guards/access.guard"
import { UserRepository } from "../auth/repository/user.repository"

@Module({
    imports:[]
})
export class KivModule{}