
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompany extends Model
{
    use HasFactory;

    protected $fillable = ['main_title', 'highlighted_title'];

    public function primaryStats()
    {
        return $this->hasMany(AboutCompanyPrimaryStat::class);
    }

    public function secondaryStats()
    {
        return $this->hasMany(AboutCompanySecondaryStat::class);
    }

    public function productionCapacity()
    {
        return $this->hasOne(AboutCompanyProductionCapacity::class);
    }

    public function units()
    {
        return $this->hasMany(AboutCompanyUnit::class);
    }

    public function bankingPartners()
    {
        return $this->hasMany(AboutCompanyBankingPartner::class);
    }

    public function sisterConcerns()
    {
        return $this->hasMany(AboutCompanySisterConcern::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanyPrimaryStat extends Model
{
    use HasFactory;

    protected $fillable = ['about_company_id', 'label', 'value', 'icon', 'order'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanySecondaryStat extends Model
{
    use HasFactory;

    protected $fillable = ['about_company_id', 'label', 'value', 'icon', 'order'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanyProductionCapacity extends Model
{
    use HasFactory;

    protected $fillable = ['about_company_id', 'title'];

    public function datasets()
    {
        return $this->hasMany(AboutCompanyProductionCapacityDataset::class);
    }

    public function metrics()
    {
        return $this->hasMany(AboutCompanyProductionMetric::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanyProductionCapacityDataset extends Model
{
    use HasFactory;

    protected $fillable = [
        'production_capacity_id', 
        'label', 
        'data', 
        'background_color', 
        'border_color', 
        'border_width',
        'order'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanyProductionMetric extends Model
{
    use HasFactory;

    protected $fillable = ['production_capacity_id', 'label', 'value', 'icon'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanyUnit extends Model
{
    use HasFactory;

    protected $fillable = ['about_company_id', 'title'];

    public function plants()
    {
        return $this->hasMany(AboutCompanyPlant::class, 'unit_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanyPlant extends Model
{
    use HasFactory;

    protected $fillable = ['unit_id', 'name', 'image_path'];

    public function details()
    {
        return $this->hasMany(AboutCompanyPlantDetail::class, 'plant_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanyPlantDetail extends Model
{
    use HasFactory;

    protected $fillable = ['plant_id', 'key', 'value'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanyBankingPartner extends Model
{
    use HasFactory;

    protected $fillable = ['about_company_id', 'name', 'image_path'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutCompanySisterConcern extends Model
{
    use HasFactory;

    protected $fillable = ['about_company_id', 'name', 'description', 'icon'];
}