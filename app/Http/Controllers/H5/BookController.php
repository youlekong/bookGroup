<?php

namespace App\Http\Controllers\H5;

use App\Models\User;
use App\Models\Book;
use App\Models\Rental;
use App\Http\Requests\BookRequest;
use Illuminate\Support\Facades\DB;

class BookController extends ApiController
{
//    const bookTypes = [
//        1 => 'borrowBooks',
//        2 => 'returnBooks'
//    ];

    public function getBooks(BookRequest $request)
    {
        $params = $request->all();

        $type = $params['type'];
        if ($type == 0) {      // 借书
            $model = Book::with(['user']);
            $model->where(['s_id'=> $params['sid'], 'status' => Book::STATUS_RENTALING]);
            $data = $model->get();
        } elseif ($type == 1) {    // 还书
            $uid = $request->cookie('laravel_bg_h5');

            $rental = DB::table('rental')
                ->join('book', 'book.id', '=', 'rental.b_id')
                ->where(['rental.u_id' => $uid, 'rental.status' => Rental::RENTAL_RENTALED])
                ->where('book.s_id', $params['sid'])
                ->select('book.*', 'rental.from_id')
                ->get();
            $rental = json_decode($rental, true);

            $data = array();
            foreach ($rental as $k => $r) {
                $r['user'] = User::where('id', $r['from_id'])->first();
                $data[$k] = $r;
            }
        }

        return $this->success($data);
    }
}