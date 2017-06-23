import {Injectable} from '@angular/core';
import {MuscleEnum} from "../_enums/MuscleEnum";

@Injectable()
export class MuscleEnumService {

  constructor() {
  }

  public getFromName(name: string): MuscleEnum.Name {
    switch (name) {
      case 'Biceps':
        return MuscleEnum.Name.Biceps;
      case'Traps':
        return MuscleEnum.Name.Traps;
      case 'Lumbar':
        return MuscleEnum.Name.Lumbar;
      case'Pecs':
        return MuscleEnum.Name.Pecs;
      case'Cardio':
        return MuscleEnum.Name.Cardio;
      case 'Posterior deltoid':
        return MuscleEnum.Name.PosteriorDeltoid;
      case 'Deltoid':
        return MuscleEnum.Name.Deltoid;
      case 'Latissimus dorsi':
        return MuscleEnum.Name.LatissimusDorsi;
      case'Triceps':
        return MuscleEnum.Name.Triceps;
      case'Middle back':
        return MuscleEnum.Name.MiddleBack;
      case'Lower back':
        return MuscleEnum.Name.LowerBack;
      case 'Thigh quadriceps':
        return MuscleEnum.Name.ThighQuadriceps;
      case'Thigh biceps':
        return MuscleEnum.Name.ThighBiceps;
      case'Gluteus maximus':
        return MuscleEnum.Name.GluteusMaximus;
      case 'Gluteus medius':
        return MuscleEnum.Name.GluteusMedius;
      case'Gastrocnemius lateral':
        return MuscleEnum.Name.GastrocnemiusLateral;
    }
  }

  public getNameFromFrenchName(name: string): MuscleEnum.Name {
    switch (name) {
      case 'Bicepts':
        return MuscleEnum.Name.Biceps;
      case'Trapèze':
        return MuscleEnum.Name.Traps;
      case 'Lombaire':
        return MuscleEnum.Name.Lumbar;
      case'Pectoraux':
        return MuscleEnum.Name.Pecs;
      case'Cardio':
        return MuscleEnum.Name.Cardio;
      case 'Deltoide postérieur':
        return MuscleEnum.Name.PosteriorDeltoid;
      case 'Deltoide':
        return MuscleEnum.Name.Deltoid;
      case 'Grand dorsal':
        return MuscleEnum.Name.LatissimusDorsi;
      case'Tricepts':
        return MuscleEnum.Name.Triceps;
      case'Dos central':
        return MuscleEnum.Name.MiddleBack;
      case'Bas du dos':
        return MuscleEnum.Name.LowerBack;
      case 'Avant de la cuisse':
        return MuscleEnum.Name.ThighQuadriceps;
      case'Arrière de la cuisse':
        return MuscleEnum.Name.ThighBiceps;
      case'Grand fessier':
        return MuscleEnum.Name.GluteusMaximus;
      case 'Moyen fessier':
        return MuscleEnum.Name.GluteusMedius;
      case'Mollet':
        return MuscleEnum.Name.GastrocnemiusLateral;
    }
  }

  public getFrenchNameFromName(enumValue: MuscleEnum.Name): string {
    switch (enumValue) {
      case MuscleEnum.Name.Biceps:
        return 'Bicepts';
      case MuscleEnum.Name.Traps:
        return 'Trapèze';
      case MuscleEnum.Name.Lumbar:
        return 'Lombaire';
      case MuscleEnum.Name.Pecs:
        return 'Pectoraux';
      case MuscleEnum.Name.Cardio:
        return 'Cardio';
      case MuscleEnum.Name.PosteriorDeltoid:
        return 'Deltoide postérieur';
      case MuscleEnum.Name.Deltoid:
        return 'Deltoide';
      case MuscleEnum.Name.LatissimusDorsi:
        return 'Grand dorsal';
      case MuscleEnum.Name.Triceps:
        return 'Tricepts';
      case MuscleEnum.Name.MiddleBack:
        return 'Dos central';
      case MuscleEnum.Name.LowerBack:
        return 'Bas du dos';
      case MuscleEnum.Name.ThighQuadriceps:
        return 'Avant de la cuisse';
      case MuscleEnum.Name.ThighBiceps:
        return 'Arrière de la cuisse';
      case MuscleEnum.Name.GluteusMaximus:
        return 'Grand fessier';
      case MuscleEnum.Name.GluteusMedius:
        return 'Moyen fessier';
      case MuscleEnum.Name.GastrocnemiusLateral:
        return 'Mollet';
    }
  }
}
